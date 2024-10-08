export const validateContactForm = () => {
  console.log('validateContactForm')
  jQuery(document).ready(($) => {
    "use strict"

    $('form.contactForm').submit(() => {
      let f = $(this).find('.form-group'),
        ferror = false,
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i

      f.children('input').each(() => {
        let i = $(this)
        let rule = i.attr('data-rule')

        if (rule !== undefined) {
          let ierror = false
          let pos = rule.indexOf(':', 0)
          if (pos >= 0) {
            let exp = rule.substr(pos + 1, rule.length)
            rule = rule.substr(0, pos)
          } else {
            rule = rule.substr(pos + 1, rule.length)
          }

          switch (rule) {
            case 'required':
              if (i.val() === '') {
                ferror = ierror = true
              }
              break

            case 'minlen':
              if (i.val().length < parseInt(exp)) {
                ferror = ierror = true
              }
              break

            case 'email':
              if (!emailExp.test(i.val())) {
                ferror = ierror = true
              }
              break

            case 'checked':
              if (!i.is(':checked')) {
                ferror = ierror = true
              }
              break

            case 'regexp':
              exp = new RegExp(exp)
              if (!exp.test(i.val())) {
                ferror = ierror = true
              }
              break
          }
          i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind')
        }
      })
      f.children('textarea').each(() => {
        let i = $(this)
        let rule = i.attr('data-rule')

        if (rule !== undefined) {
          let ierror = false
          let pos = rule.indexOf(':', 0)
          if (pos >= 0) {
            let exp = rule.substr(pos + 1, rule.length)
            rule = rule.substr(0, pos)
          } else {
            rule = rule.substr(pos + 1, rule.length)
          }

          switch (rule) {
            case 'required':
              if (i.val() === '') {
                ferror = ierror = true
              }
              break

            case 'minlen':
              if (i.val().length < parseInt(exp)) {
                ferror = ierror = true
              }
              break
          }
          i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind')
        }
      })
      let str = null
      if (ferror) return false
      else str = $(this).serialize()
      let action = $(this).attr('action')
      if (!action) {
        action = window.location.href
      }
      /* $.ajax({
        type: "POST",
        url: action,
        data: str,
        success: (msg) => {
          if (msg == 'OK') {
            $("#sendmessage").addClass("show")
            $("#errormessage").removeClass("show")
            $('.contactForm').find("input, textarea").val("")
          } else {
            $("#sendmessage").removeClass("show")
            $("#errormessage").addClass("show")
            $('#errormessage').html(msg)
          }
        }
      }) */
      alert('CONTACTO ENVIADO')
      $("#sendmessage").addClass("show")
      $("#errormessage").removeClass("show")
      $('.contactForm').find("input, textarea").val("")
      return false
    })
  })
}