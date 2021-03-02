const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
}

    // Cuando se llena el formulario
exports.agregarTestimonial = async (req, res) => {
    // Validar que todos los campos esten lenos
    let {nombre, correo, mensaje} = req.body;
    let errores = [];
    if (!nombre) {
        errores.push({'mensaje': 'Por favor Ingrese su nombre'})
    }
    if (!correo) {
        errores.push({'mensaje': 'Por favor Ingrese su correo'})
    }
    if (!mensaje) {
        errores.push({'mensaje': 'Por favor Ingrese un mensaje'})
    }
    // Revisar si hay errores
    if (errores.length > 0) {
        // mostrar la vista con errores
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            // al pasar los errores se mantienen los campos
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        })
    } else {
        // Almacenar en la BD 
        Testimonial.create({
            nombre,
            correo,
            mensaje
        }).then( testimonial => res.redirect('/testimoniales'))
          .catch( error => console.log(error));
    }
}