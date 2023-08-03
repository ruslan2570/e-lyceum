<?php

require 'vendor/autoload.php';
require_once('../token_validator.php');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$config = include '../db_config.php';

set_time_limit(260);
ini_set('memory_limit', '512M');

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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    header("Content-Transfer-Encoding: binary");
    header("Content-Disposition: attachment; filename='import.xlsx'");

    $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();

    $sheet = $spreadsheet->getActiveSheet();

    $sheet->setCellValue('A1', 'ID');
    $sheet->setCellValue('B1', 'Тема');
    $sheet->setCellValue('C1', 'Учитель');
    $sheet->setCellValue('D1', 'Имя');
    $sheet->setCellValue('E1', 'Фамилия');
    $sheet->setCellValue('F1', 'Логин');
    $sheet->setCellValue('G1', 'Класс');
    $sheet->setCellValue('G1', 'Дата выбора');

    $topic_query = "SELECT\n"
        . "    topic.id as id,\n"
        . "    class.value AS class,\n"
        . "    class.id as class_id,"
        . "    teacher.fullname AS teacher,\n"
        . "    student.firstname AS student_firstname,\n"
        . "    student.lastname AS student_lastname,\n"
        . "    student.login AS student_login,\n"
        . "    topic.selection_date as selection_date,\n"
        . "    topic.name AS topic\n"
        . "FROM\n"
        . "    topic\n"
        . "INNER JOIN teacher ON topic.teacher_id = teacher.id\n"
        . "INNER JOIN class ON topic.class_id = class.id\n"
        . "LEFT JOIN student ON topic.student_id = student.id\n"
        . "ORDER BY topic.id ASC";

    $topic_result = mysqli_query($link, $topic_query);

    if ($topic_result) {
        // Извлечение данных и сохранение их в ассоциативном массиве
        $data = array();
        $i = 1;
        while ($row = mysqli_fetch_assoc($topic_result)) {
            $i++;
            $sheet->setCellValue("A$i", $row['id']);
            $sheet->setCellValue("B$i", $row['topic']);
            $sheet->setCellValue("C$i", $row['teacher']);
            $sheet->setCellValue("D$i", $row['student_firstname']);
            $sheet->setCellValue("E$i", $row['student_lastname']);
            $sheet->setCellValue("F$i", $row['student_login']);
            $sheet->setCellValue("G$i", $row['class']);
            $sheet->setCellValue("G$i", $row['selection_date']);
        }
    } else {
        $response = [
            'error' => "Ошибка выполнения запроса: " . mysqli_error($link)
        ];
        http_response_code(500);
        exit;
    }

    $sheet->getColumnDimension('B')->setWidth(80);
    $sheet->getColumnDimension('C')->setWidth(25);
    $sheet->getColumnDimension('D')->setWidth(10);
    $sheet->getColumnDimension('E')->setWidth(10);
    $sheet->getColumnDimension('F')->setWidth(10);
    $sheet->getColumnDimension('G')->setWidth(25);

    $sheet->getStyle('A1:G1')
        ->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

    $sheet->setAutoFilter(
        $sheet
            ->calculateWorksheetDimension()
    );
    
    # $writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, "Xlsx");

    $filename = bin2hex(random_bytes(16));

    $writer->save($filename . ".xlsx");

    readfile($filename . ".xlsx");

    unlink($filename . ".xlsx");

    exit;
}
