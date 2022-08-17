//Função de criação de cartelas;
//sorteio de 5 listas (B, I, N, G, O) e organização numa lista maior, 
//Não armazenar números repetidos.

export function CreateCard(bingo:number[]) {

    let b=[],i = [],n = [],g= [] ,o = [];

    for(let x=0;x<5;x++){
        let y = Math.ceil(Math.random() * 15);
        if(b.indexOf(y) != -1){
            x--
            continue;
        }else{
            b.push(y);
        }
    };

    for(let x=0;x<5;x++){
        let y = Math.ceil(Math.random() * 15 + 15);
        if(i.indexOf(y) != -1){
            x--
            continue
        }else{
            i.push(y);
        }
    };


    for(let x=0;x<5;x++){
        let y = Math.ceil(Math.random() * 15 + 30);
        if(n.indexOf(y) != -1){
            x--
            continue
        }else{
            n.push(y);
        }
    };

    for(let x=0;x<5;x++){
        let y = Math.ceil(Math.random() * 15 + 45);
        if(g.indexOf(y) != -1){
             x--
            continue
        }else{
            g.push(y);
        }
    };

    for(let x=0;x<5;x++){
        let y = Math.ceil(Math.random() * 15 + 60);
        if(o.indexOf(y) != -1){
            x--
            continue
        }else{
            o.push(y);
        }
    };

    for(let x=0;x<5;x++){
        bingo.push(b[x])
    }

    for(let x=0;x<5;x++){
        bingo.push(i[x])
    }

    for(let x=0;x<5;x++){
        bingo.push(n[x])
    }

    for(let x=0;x<5;x++){
        bingo.push(g[x])
    }

    for(let x=0;x<5;x++){
        bingo.push(o[x])
    }

    return bingo;
}


