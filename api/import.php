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
    die("Ошибка: " . mysqli_connect_error());
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

if(isset($_FILES['file']['tmp_name'])){
    $file_name = $_FILES['file']['tmp_name'];
} else{
    http_response_code(400);
    $response = [
        'error' => 'Отсутствует файл'
    ];

    echo json_encode($response);
}

$reader = new Xlsx();
$spreadsheet = $reader->load($file_name);
$worksheet = $spreadsheet->getActiveSheet();

$cellValue = $worksheet->getCell('A1')->getValue();

$rows_nums = 0;
for(;; $rows_nums++){
    $cellValueA = $worksheet->getCell('A' . $rows_nums + 2)->getValue();
    $cellValueB = $worksheet->getCell('B' . $rows_nums + 2)->getValue();
    $cellValueC = $worksheet->getCell('C' . $rows_nums + 2)->getValue();

    if(!isset($cellValueA) || !isset($cellValueB) || !isset($cellValueC) ){
        break;
    }
}

echo 'Количество строк: ' . $rows_nums . '\n';

echo 'A' . $rows_nums + 1 . ':C' . $rows_nums;

$data_range = $worksheet->rangeToArray('A2' . ':C' . $rows_nums + 1);
print_r($data_range);



foreach ($data_range as $topic) {
    $topicName = $project[0];
    $teacherName = $project[1];
    $topicClass = $project[2];

    $is_teacher_exists = teacher_exists($teacherName);
    
    if($is_teacher_exists){
        add_topic($topic, $link);
    } else{
        add_teacher($teacherName, $link);
        add_topic($topic, $link);
    }

}
}

function teacher_exists($teacherName, $link) {
    // Подготовка запроса с заполнителем для параметра $teacherName
    $sql = "SELECT id FROM teachers WHERE name = ?";
    $stmt = $link->prepare($sql);

    // Привязка параметра $teacherName к заполнителю
    $stmt->bind_param("s", $teacherName);

    // Выполнение запроса
    $stmt->execute();

    // Связывание результата запроса с переменной
    $stmt->bind_result($teacherId);

    // Получение результата
    $exists = $stmt->fetch();

    // Закрытие подготовленного запроса
    $stmt->close();

    // Если учитель существует (запрос вернул хотя бы одну запись), вернуть true, иначе вернуть false
    return $exists;
}


function add_topic($topic, $link){   
    $topicTitle = $link->real_escape_string($topic[0]);
    $teacherName = $link->real_escape_string($topic[1]);
    $topicClass = (int)$topic[2];    


        $teacher_sql = "SELECT id FROM teacher WHERE name = '$teacherName'";
        $teacher_result = $link->query($teacher_sql);

        $class_sql = "SELECT id FROM class WHERE value = '$topicClass'";
        $class_result = $link->query($class_sql);
    
        if ($teacher_result->num_rows > 0 && $class_result->num_rows) {
            $teacher_row = $teacher_result->fetch_assoc();
            $class_row = $class_result->fetch_assoc();
            $teacherId = $teacher_row['id'];
            $classId = $class_row['id'];
    
            // Добавляем тему с указанным учителем
            $sql = "INSERT INTO topics (name, teacher_id, class_id) VALUES ('$topicTitle', $teacherId, $classId)";
            $link->query($sql);
        } else {
            // Если учитель не существует, просто выводим сообщение об ошибке (можно добавить логику создания учителя, если нужно)
            echo "Ошибка: Учитель '$teacherName' не найден в базе данных.";
        }
    }
    


function add_teacher($teacherName, $link){
    
    // Проверяем, существует ли учитель с таким именем
    $sql = "SELECT id FROM teacher WHERE name = '$teacherName'";
    $result = $link->query($sql);

    if ($result->num_rows > 0) {
        // Учитель уже существует, ничего не делаем
        return;
    }

    // Если учителя нет в базе данных, добавляем его
    $sql = "INSERT INTO teacher (name) VALUES ('$teacherName')";
    $link->query($sql);
}
