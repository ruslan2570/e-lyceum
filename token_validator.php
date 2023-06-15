<?php
function validateToken($token, $link) {

    // Проверка соединения с базой данных
    if (!$link) {
        die("Ошибка соединения: " . mysqli_connect_error());
    }
    
    // Проверка токена

    if(!isset($token)){
        return false;
    }

    $query = "SELECT * FROM session WHERE token = '$token' AND expiration_date > NOW()";
    $result = mysqli_query($link, $query);

    if (mysqli_num_rows($result) > 0) {
        return true; // Токен действителен
    } else {
        return false; // Токен недействителен
    }
}
?>
