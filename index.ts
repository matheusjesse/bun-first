import figlet from "figlet";

const server = Bun.serve({
    port: 3000,
    fetch(req){

        const url = new URL(req.url)
        
        if(url.pathname === '/'){
            const body = figlet.textSync("Hola!")
            return new Response(body);
        }
        if(url.pathname === '/about'){
            return new Response("about me!")
        }

        if(url.pathname === '/contact'){
            return new Response("contac us!")
        }

        if(url.pathname === '/feed'){
            throw new Error('Could not fetch feed');
        }

        if(url.pathname === '/greet'){
            return new Response(Bun.file('greet.txt'));
        }

        return new Response('404');
    },
    error(error){
        return new Response(`<pre> ${error} \n ${error.stack} </pre>`, {
            headers: {
                'Content-Type': 'text/html'
            }
        })
    }
});

console.log(`Listening on PORT http://localhost:${server.port}`)