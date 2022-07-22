export const errormsg = (msgHead: string, msgError: string, msgSolution: string): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Untitled</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
  <body>
    <div class="container w-100 h-100" style="width: 100%;height: 100%;">
    <div class="col">
        <div class="row">
            <div class="col" style="text-align: center;"><span style='font-size:100px;'>&#9940;</span></div>
        </div>
        <div class="row">
            <div class="col">
                <h1 style="text-align: center;color: #a2a2a2;font-family: fira code;">${msgHead}</h1>
                <p class="lead shadow-none" style="text-align: center;color: rgb(154,154,154);font-family: fira code;font-size: 22px;margin: 34px;">${msgError}<br />${msgSolution}</p>
            </div>
        </div>
    </div>
</div>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>
  </body>
  </html>
  `
}
