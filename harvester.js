const ipcRenderer = require('electron').ipcRenderer

window.addEventListener("load", async (e) => {
    if (location.host.includes('supremenewyork')) {
        $("body").html("")
        $("body").css('background-color', '#131313')
        $("body").append(`<video style="width: 100%; padding-top: 50px" autoplay muted loop >
        <source src="https://cdn.shopify.com/s/files/1/0359/3437/1975/files/Captcha_solver_gif_2.mp4?v=1590269435" type="video/mp4">
        </video>`)
    
        $("body").append("<div id='gc' data-size='invisible' data-error-callback='captchaError'></div>")
    
        $("#gc").css({
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          "z-index": 99,
        })
    
    
        const captchaID = window.grecaptcha.render("gc", {
          theme: "dark",
          sitekey: "6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz",
          callback: "callback",
        })
    
        window.callback = async (token) => {
          ipcRenderer.send('captcha-done', token)
          //check captcha score
          setTimeout(() => {
            location.reload()
          }, 250)
    
        }
    
        window.captchaError = async (error) => {
          log.error('captcha error callback')
          log.error(error)
          console.log(error)
    
          setTimeout(() => {
            location.reload()
          }, 250)
        }
    
        window.grecaptcha.execute(captchaID)
    
        ipcRenderer.on("triggerCaptcha", async () => {
          window.grecaptcha.execute(captchaID)
        })
      }
    })