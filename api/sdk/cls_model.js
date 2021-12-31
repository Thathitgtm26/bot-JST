const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // x1, x2, & x3
    x1 = (data[0] - 42.6633) / 10.6153
    x2 = (data[1] - 88.7367) / 19.014
    x3 = (data[2] - 143.048) / 23.0612
    y1 = (data[3] - 74.7378) / 9,18444
    y2 = (data[4] - 49.8289) / 14.7223
    y3 = (data[5] - 49.8289) / 14.7223
    return [x1, x2, x3, y1, y2, y3]
}

const argFact = (compareFn) => (array) => array.map((el, idx) => [el, idx]).reduce(compareFn)[1]
const argMax = argFact((min, el) => (el[0] > min[0] ? el : min))

function ArgMax(res){
    label = "NORMAL"
    cls_data = []
    for(i=0; i<res.length; i++){
        cls_data[i] = res[i]
    }
    // 
    
    if(argMax(cls_data) == 1){
        label = "OVER VOLTAGE"
    }if(argMax(cls_data) == 0){
        label = "DROP VOLTAGE"
    }
    return label
}

async function classify(data){
    let in_dim = 6; // x1 x2 x3 y1 y2 y3
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Thathitgtm26/bot-jst/main/public/ex_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return ArgMax( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    classify: classify 
}
