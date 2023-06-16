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

    if (
        isset($params['name']) && !empty($params['name'])
        && isset($params['teacher_id']) && !empty($params['teacher_id'])
        && isset($params['class_id']) && !empty($params['class_id'])
    ) {
        $add_topic_query = "INSERT INTO topic(name, teacher_id, class_id) VALUES ('$params[name]', '$params[teacher_id]', '$params[class_id]')";
        $result = mysqli_query($link, $add_topic_query);

        if(!$result){
            $response = [
                'error' => "Ошибка выполнения запроса: " . mysqli_error($link)
            ];
            http_response_code(500);    
        }

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
        $del_topic_query = "DELETE FROM topic WHERE id =  '$params[id]'";
        mysqli_query($link, $del_topic_query);
    } else {
        http_response_code(400);
        $response = [
            'error' => 'Неверный запрос'
        ];

        echo json_encode($response);
    }
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

    if (isset($params['id']) && !empty($params['id'])) {
        $del_topic_query = "UPDATE topic SET student_id = NULL, selection_date = NULL WHERE id =  '$params[id]'";
        mysqli_query($link, $del_topic_query);
    } else {
        http_response_code(400);
        $response = [
            'error' => 'Неверный запрос'
        ];

        echo json_encode($response);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // $data = file_get_contents('php://input');
    // $params = json_decode($data, true);
    $params = $_GET;

    if ($params['show'] == "available") {
        $topic_query = "SELECT\n"
            . "    topic.id as id,\n"
            . "    class.value AS class,\n"
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
            . "WHERE\n"
            . "    topic.student_id IS NULL;";
    } else if ($params['show'] == "busy") {
        $topic_query = "SELECT\n"
            . "    topic.id as id,\n"
            . "    class.value AS class,\n"
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
            . "INNER JOIN student ON topic.student_id = student.id\n"
            . "WHERE\n"
            . "    topic.student_id IS NOT NULL;";
    } else if (!isset($params['show']) || empty($params['show']) || $params['show'] == "all") {
        $topic_query = "SELECT\n"
            . "    topic.id as id,\n"
            . "    class.value AS class,\n"
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
            . "LEFT JOIN student ON topic.student_id = student.id;";
    }

    $topic_result = mysqli_query($link, $topic_query);

    // Проверка наличия результатов
    if ($topic_result) {
        // Извлечение данных и сохранение их в ассоциативном массиве
        $data = array();
        while ($row = mysqli_fetch_assoc($topic_result)) {
            if(!isset($params['classes']) || empty($params['classes']) || $params['show'] == "all")
            {
                $data[] = $row;
            }
            else if($params['classes'] == "high"){
                if($row['class'] > 5){
                    $data[] = $row;
                }
            }
            else if($params['classes'] = "low"){
                if($row['class'] <= 5){
                    $data[] = $row;
                }
            }
                
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
