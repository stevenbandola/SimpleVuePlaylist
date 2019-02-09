<!DOCTYPE html>
<html dir="ltr" lang="en">
    <head>
        <meta charset="utf-8"></meta>
          <title>Demo</title>
          <link crossorigin="anonymous" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" rel="stylesheet">
          <!-- <link href="css/styles.css" rel="stylesheet"/></link> -->
          <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body>
        <div id="app" class="container">
            <playlist></playlist>
        </div>
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script> -->
        <!--  -->
        <!-- <script src="node_modules/vue/dist/vue.js"></script> -->
        <script src="js/app.js"></script>
    </body>
</html>