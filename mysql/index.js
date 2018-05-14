const mysql = require('mysql');
function createConnection() {
    const connection = mysql.createConnection({
        url: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'wordpress'
    });
    return connection;
}

const methods = {
    select(sql, query = []) {
        let connection = createConnection();
        return new Promise((resolve, reject) => {
            connection.query(sql, query, (err,rows) => {
                if(err){
                    reject({msg:'查询失败',err,status:'err'})
                }else{
                    resolve({msg:'查询成功',rows,status:'ok'})
                }  
                connection.end() 
            })
        })
    },
    insert(sql,query=[]){
        let connection = createConnection();
        return new Promise((resolve, reject) => {
            connection.query(sql, query, (err,rows) => {
                if(err){
                    reject({msg:'插入失败',err,status:'err'})
                }else{
                    resolve({msg:'插入成功',rows,status:'ok'})
                }  
                connection.end() 
            })
        })
    },
    updata(sql,query=[]){
         let connection = createConnection();
        return new Promise((resolve, reject) => {
            connection.query(sql, query, (err,rows) => {
                if(err){
                    reject({msg:'更新失败',err,status:'err'})
                }else{
                    resolve({msg:'更新成功',rows,status:'ok'})
                }  
                connection.end() 
            })
        })
    }
}
module.exports=methods;
