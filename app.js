new Vue({
    el: "#app",
    data:{
        monedas: {},
        cantidad: 0,
        from: 'EUR',
        to: 'USD', //se queda sin comas por ser el ultimo valor
        resultado: 0


    },
    mounted(){
        this.getMonedas()
        },
        computed:{
            formatearMonedas(){
                return Object.values(this.monedas);
            },
            calcularResultado(){
                return (Number(this.cantidad) * this.resultado).toFixed(1);//convierte de texto a numero la variable cantidad
            },
            deshabilitado (){
                return this.cantidad ===0 || !this.cantidad; 
             }
        },
        methods:{         
            getMonedas(){
                const monedas = localStorage.getItem("monedas");
                if(monedas){
                    this.monedas = JSON.parse(monedas);
                    return;
                }
                axios.get("https://free.currconv.com/api/v7/currencies?apiKey=72f0f6c628817f0e3a75")
            .then(response =>{
            this.monedas = response.data.results;
            localStorage.setItem("monedas", JSON.stringify(response.data.results));
            //console.log(response)
            });
        },
        convertirMoneda(){
            const busqueda = `${this.from}_${this.to}`;
            axios.get(`https://free.currconv.com/api/v7/convert?q=${busqueda}&apiKey=72f0f6c628817f0e3a75`) //teclado se usa alt+096 para comillas invertidas se agrega url .
            
        
            .then((response) => {
               console.log(response) 
               this.resultado = response.data.results[busqueda].val;
            })

        }
    },
    watch:{
        from(){
            this.resultado = 0;

        },
        to(){
            this.resultado =0;
        }
    }
    
});       
    