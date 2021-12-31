const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // x1, x2, & x3
    x1 = (data[0] - 42.6633) / 10.6153
    x2 = (data[1] - 88.7367) / 19.014
    x3 = (data[2] - 143.048) / 23.0612
    return [x1, x2, x3]
}

function denormalized(data){
    y1 = (data[3] - 74.7378) / 9,18444
    y2 = (data[4] - 49.8289) / 14.7223
    y3 = (data[5] - 159.709) / 23.9795
    return [y1, y2, y3]
}


async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Thathitgtm26/bot-jst/main/public/ex_model/model.json?token=5001348467:AAHIeGBZ9etH_j3eDhEADJ4ipFAfQYEytX0';
        const model1_7 = await tf.loadGraphModel(path);
        
        predict = model1_7.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
