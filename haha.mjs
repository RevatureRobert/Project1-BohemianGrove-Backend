import bcrypt from 'bcrypt';
let hash = "";
let hash2 = "";
(bcrypt.hash("password", 10)).then(res => {
  hash = res;
  bcrypt.hash("password", 10).then(res2 => {
    hash2 = res2;
    bcrypt.compare("password", hash2).then(res3 => {
      console.log(res3);
    });
  }) 
})

