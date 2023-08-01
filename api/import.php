<?php

require 'vendor/autoload.php';
require_once('../token_validator.php');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

$config = include '../db_config.php';

// Подключение к БД
$db_host = $config["host"];
$db_user = $config["user"];
$db_password = $config["password"];
$db_name = $config["db"];

$link = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if ($link === false) {
    http_response_code(500);
    $response = [
        'error' => 'mysqli_connect_error()'
    ];

    echo json_encode($response);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] != 'OPTIONS') {
    $token = '';
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        // Извлечение токена из заголовка
        $token = str_replace('Bearer ', '', $authHeader);
    }

    // Проверка токена
    if (!validateToken($token, $link)) {

        // Токен не действителен, выполнение требуемых операций
        http_response_code(403);
        $response = [
            'error' => 'Ошибка авторизации'
        ];

        echo json_encode($response);
        exit();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_FILES['file']['tmp_name'])) {
        $file_name = $_FILES['file']['tmp_name'];
    } else {
        http_response_code(400);
        $response = [
            'error' => 'Отсутствует файл'
        ];

        echo json_encode($response);
        exit;
    }

    $reader = new Xlsx();
    $spreadsheet = $reader->load($file_name);
    $worksheet = $spreadsheet->getActiveSheet();

    $cellValue = $worksheet->getCell('A1')->getValue();

    $rows_nums = 0;
    for (;; $rows_nums++) {
        $cellValueA = $worksheet->getCell('A' . $rows_nums + 2)->getValue();
        $cellValueB = $worksheet->getCell('B' . $rows_nums + 2)->getValue();
        $cellValueC = $worksheet->getCell('C' . $rows_nums + 2)->getValue();

        if (!isset($cellValueA) || !isset($cellValueB) || !isset($cellValueC)) {
            break;
        }
    }

    if ($rows_nums === 0) {
        http_response_code(400);
        $response = [
            'error' => 'Шаблон не заполнен'
        ];
    
        echo json_encode($response);
        exit();
    }

    #echo 'Количество строк: ' . $rows_nums . '\n';

    #echo 'A' . $rows_nums + 1 . ':C' . $rows_nums;

    $data_range = $worksheet->rangeToArray('A2' . ':C' . $rows_nums + 1);
    //print_r($data_range);

    foreach ($data_range as $topic) {
        $topicName = $topic[0];
        $teacherName = $topic[1];
        $topicClass = $topic[2];

        $is_teacher_exists = teacher_exists($teacherName, $link);

        if ($is_teacher_exists) {
            add_topic($topic, $link);
        } else {
            add_teacher($teacherName, $link);
            add_topic($topic, $link);
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    header("Content-Transfer-Encoding: binary");
    header("Content-Disposition: attachment; filename='import.xlsx'");

    readfile("import.xlsx");

    exit;
}

function teacher_exists($teacherName, $link)
{
    // Подготовка запроса с заполнителем для параметра $teacherName
    $sql = "SELECT id FROM teacher WHERE fullname = ?";
    $stmt = $link->prepare($sql);

    // Привязка параметра $teacherName к заполнителю
    $stmt->bind_param("s", $teacherName);

    // Выполнение запроса
    $stmt->execute();

    // Сохранение результата запроса в буфере
    $stmt->store_result();

    // Получение количества строк, возвращенных запросом
    $numRows = $stmt->num_rows;

    // Закрытие подготовленного запроса
    $stmt->close();

    // Если есть хотя бы одна строка, значит учитель существует
    return $numRows > 0;
}



function add_topic($topic, $link)
{
    $topicTitle = $link->real_escape_string($topic[0]);
    $teacherName = $link->real_escape_string($topic[1]);
    $topicClass = (int)$topic[2];

    $teacher_sql = "SELECT id FROM teacher WHERE fullname = '$teacherName'";
    $teacher_result = $link->query($teacher_sql);

    $class_sql = "SELECT id FROM class WHERE value = '$topicClass'";
    $class_result = $link->query($class_sql);

    if ($teacher_result->num_rows > 0 && $class_result->num_rows > 0) {
        $teacher_row = $teacher_result->fetch_assoc();
        $class_row = $class_result->fetch_assoc();
        $teacherId = $teacher_row['id'];
        $classId = $class_row['id'];

        // Добавляем тему с указанным учителем
        $sql = "INSERT INTO topic (name, teacher_id, class_id) VALUES ('$topicTitle', $teacherId, $classId)";
        $link->query($sql);
    } else if ($class_result->num_rows === 0) {
        http_response_code(400);
        $response = [
            'error' => 'Некорректный класс'
        ];

        echo json_encode($response);
        exit;
    }
}

function add_teacher($teacherName, $link)
{
    // Проверяем, существует ли учитель с таким именем
    $sql = "SELECT id FROM teacher WHERE fullname = '$teacherName'";
    $result = $link->query($sql);

    if ($result->num_rows > 0) {
        // Учитель уже существует, ничего не делаем
        return;
    }

    // Если учителя нет в базе данных, добавляем его
    $sql = "INSERT INTO teacher (fullname) VALUES ('$teacherName')";
    $link->query($sql);
}
