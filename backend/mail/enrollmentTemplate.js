exports.enrollment = (name, email) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    h1{
        color:'red'
    }
    </style>
    </head>
    <body>
    <h1>${name} have enrolled in a course!</h1>
    </body>
    </html>
    
    `;
};
