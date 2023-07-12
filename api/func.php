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
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
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

    if (isset($params['password']) && !empty($params['password'])) {
        $password = $params['password'];
        $update_password_query = "UPDATE setting SET content = '$password' WHERE property LIKE 'user_password'";
        mysqli_query($link, $update_password_query);
    } else {
        http_response_code(400);
        $response = [
            'error' => 'Неверный запрос'
        ];

        echo json_encode($response);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

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

    $delete_all_student_query = "DELETE FROM student";
    mysqli_query($link, $delete_all_student_query);
}
