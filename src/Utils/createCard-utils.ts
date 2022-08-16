//Função de criação de cartelas;
//sorteio de 5 listas (B, I, N, G, O) e organização numa lista maior, 
//sem armazenar números repetidos.


    let b=[4],i = [4],n = [4],g= [4] ,o = [4];
    let bingo = [];
    
    for(let x=0;x<4;x++){
        b[x] = Math.floor(Math.random() * (15 - 1) + 1);
    };

    for(let x=0;x<4;x++){
        i[x] = Math.floor(Math.random() * (30 - 16) + 16);
    };

    for(let x=0;x<4;x++){
        n[x] = Math.floor(Math.random() * (45 - 31) + 31);
    };

    for(let x=0;x<4;x++){
        g[x] =  Math.floor(Math.random() * (60 - 46) + 46);
    };

    for(let x=0;x<4;x++){
        o[x] = Math.floor(Math.random() * (75 - 61) + 61);
    };

    for(let x=0;x<4;x++){
        bingo[x] = b[x];
    };

    for(let x=4;x<8;x++){
        bingo[x] = i[x];
    };

    for(let x=8;x<12;x++){
        bingo[x] = n[x];
    };

    for(let x=12;x<16;x++){
        bingo[x] = g[x];
    };

    for(let x=16;x<20;x++){
        bingo[x] = o[x];
    };

    console.log(`b = ${b}`);
    console.log(`i = ${i}`);
    console.log(`n = ${n}`);
    console.log(`g = ${g}`);
    console.log(`o = ${o}`);
    console.log('-------------------------');
    console.log(bingo);






