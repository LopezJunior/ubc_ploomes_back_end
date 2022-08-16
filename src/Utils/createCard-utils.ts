//Função de criação de cartelas;
//sorteio de 5 listas (B, I, N, G, O) e organização numa lista maior, 
//sem armazenar números repetidos.

export function createCard(bingo: number[]) {
    let b = [4],i = [4],n = [4],g= [4] ,o = [4];
    
    for(let x=0;x<4;x++){
        b.push(Math.random() * (15 - 1) + 1);
    };

    for(let x=0;x<4;x++){
        i.push(Math.random() * (30 - 16) + 16);
    };

    for(let x=0;x<4;x++){
        n.push(Math.random() * (45 - 31) + 31);
    };

    for(let x=0;x<4;x++){
        g.push(Math.random() * (60 - 46) + 46);
    };

    for(let x=0;x<4;x++){
        o.push(Math.random() * (75 - 61) + 61);
    };

    for(let x=0;x<4;x++){
        bingo.push(b[x]);
    };

    for(let x=0;x<4;x++){
        bingo.push(i[x]);
    };

    for(let x=0;x<4;x++){
        bingo.push(n[x]);
    };

    for(let x=0;x<4;x++){
        bingo.push(g[x]);
    };

    for(let x=0;x<4;x++){
        bingo.push(o[x]);
    };

    return bingo;
}



