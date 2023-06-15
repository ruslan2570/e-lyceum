<?php
require_once('../token_validator.php');
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
    $data = file_get_contents('php://input');
    $params = json_decode($data, true);

    // // Получение токена из запроса
    // $token = $_SERVER['HTTP_AUTHORIZATION']; // Пример для токена в заголовке

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

    if (isset($params['fullname']) && !empty($params['fullname'])) {
        $add_teacher_query = "INSERT INTO teacher(fullname) VALUES ('$params[fullname]')";
        mysqli_query($link, $add_teacher_query);
        http_response_code(201);
    } else {
        http_response_code(400);
        $response = [
            'error' => 'Неверный запрос'
        ];

        echo json_encode($response);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = file_get_contents('php://input');
    $params = json_decode($data, true);

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

    if (isset($params['id']) && !empty($params['id'])) {
        $add_teacher_query = "DELETE FROM teacher WHERE id =  '$params[id]'";
        mysqli_query($link, $add_teacher_query);
    } else {
        http_response_code(400);
        $response = [
            'error' => 'Неверный запрос'
        ];

        echo json_encode($response);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = file_get_contents('php://input');
    $params = json_decode($data, true);

    $teacher_query = "SELECT * FROM teacher";

    $teacher_result = mysqli_query($link, $teacher_query);

    // Проверка наличия результатов
    if ($teacher_result) {
        // Извлечение данных и сохранение их в ассоциативном массиве
        $data = array();
        while ($row = mysqli_fetch_assoc($teacher_result)) {
            $data[] = $row;
        }

        // Преобразование данных в формат JSON
        $json = json_encode($data);

        // Вывод JSON-строки
        echo $json;
    } else {
        $response = [
            'error' => "Ошибка выполнения запроса: " . mysqli_error($link)
        ];
        http_response_code(500);
    }
    
}
