var doc = document;

const timer = ms => new Promise(res => setTimeout(res, ms))

async function setAttributes(el, attrs) {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}

//====================================================================

async function create_Decau(idTopics, contentTopics){
  var main = doc.querySelector('#main ol');
  for(var [index, idTopic] of idTopics.entries()){
    var contentTopic = contentTopics[idTopic];
    var cau = doc.createElement('li');
    setAttributes(cau, {id:`a${index+1}`, class:'Cau fw-bold fs-4'});
    var ques = doc.createElement('span');
    ques.innerHTML = contentTopic['Questions'][0]; 

    var ans = doc.createElement('ol');
    setAttributes(ans, {type: 'A', addClass: 'fw-normal fs-5'});
    var i = 0;
    try {
      while(true){
        var key = `mca_${i}`;
        var value = contentTopic['MCAs'][0]['MCA'][key];
        if(value == undefined) break;
        var tung_cau = doc.createElement('li');
        tung_cau.innerHTML = value;
        if(key == contentTopic['MCAs'][0]['Answer']) tung_cau.setAttribute('class','fw-bold bg-success');
        ans.appendChild(tung_cau);
        ++i;
      }
    } catch (error){}
    cau.appendChild(ques)
    cau.appendChild(ans);
    main.appendChild(cau);
    await timer(50);
  }
}

async function create_Dephan(ma, idTopics, contentTopics){
    counter = 0;
    var main = doc.querySelector(ma);
    for(var [index, idTopic] of idTopics.entries()){
        var CAUS = doc.createElement('ol');
        CAUS.setAttribute('class','Caus');
        var phan = doc.createElement('li');
        setAttributes(phan, {id:`c${index+1}`, class:'Phan fw-bold fs-4'});
        var contentTopic = contentTopics[idTopic];
        var nameTopic = doc.createElement('span');
        for(var name of contentTopic['nameTopic'])
            nameTopic.innerHTML += name + '<br>';

        phan.appendChild(nameTopic);
        phan.appendChild(CAUS);
        main.appendChild(phan);
        var ma = doc.querySelector(`#main #c${index+1} ol`);
        ma.style = `counter-reset: lis ${counter}`;
        for(var [index, Question] of contentTopic['Questions'].entries()){
            var cau = doc.createElement('li');
            setAttributes(cau, {id:`a${index+1}`, class:'Cau fw-bold fs-4'});
            var ques = doc.createElement('span');
            ques.innerHTML = Question + '<br>';

            var ans = doc.createElement('ol');
            setAttributes(ans, {type: 'A', addClass: 'fw-normal fs-5'});
            var i = 0;
            try {
                while(true){
                    var key = `mca_${i}`;
                    var value = contentTopic['MCAs'][index]['MCA'][key];
                    if(value == undefined) break;
                    var tung_cau = doc.createElement('li');
                    tung_cau.innerHTML = value;
                    if(key == contentTopic['MCAs'][index]['Answer']) tung_cau.setAttribute('class','fw-bold bg-success');
                    ans.appendChild(tung_cau);
                    ++i;
                }
            } catch (error){}
            cau.appendChild(ques)
            cau.appendChild(ans);
            ma.appendChild(cau);
            ++counter;
            await timer(50);
        }
        await timer(50);
    }
}

async function printTopics(Topics){
  var CAUS = $('<ol/>').addClass('Caus');
  var PHANS = $('<ol/>').addClass('Phans');
  if(Topics.isMulti == 0){
    $('#main').append(CAUS);
    create_Decau(Topics.idTopics, Topics.contentTopics);
  } else {
    $('#main').append(PHANS);
    create_Dephan('#main ol',  Topics.idTopics, Topics.contentTopics);
  }
}

//===================================================================

async function printDataLogs(DataLogs){
  var main = doc.querySelector('#main');
  var dem = 1;
  var text = `<div class="form-check form-check-inline fs-4">
            <input class="form-check-input" type="checkbox" id="chualam" checked value="option1">
            <label class="form-check-label" for="chualam">Chưa làm</label>
            </div>
            <div class="form-check form-check-inline fs-4">
            <input class="form-check-input" type="checkbox" id="dung" checked value="option2">
            <label class="form-check-label" for="dung">Đúng</label>
            </div>
            <div class="form-check form-check-inline fs-4">
            <input class="form-check-input" type="checkbox" id="sao" checked value="option3">
            <label class="form-check-label" for="sao">Sai</label>
            </div><br>`;
  main.innerHTML = text;
  for(var DataLog of DataLogs){
      var result = DataLog['result'];
      if(!Array.isArray(result)) result = [result];
      for(var rs of result){
          var container = doc.createElement('div');
          container.setAttribute('class','fw-bold fs-4');  
          switch (rs) {
                case 0:
                    text = '<span class = "badge bg-danger">Sai</span>';
                    container.classList.add('sai');
                    break;
                case 1:
                    text = '<span class = "badge bg-success">Đúng</span>';
                    container.classList.add('dung');
                    break;
                default:
                    text = '<span class = "badge bg-secondary">Chưa làm</span>';
                    container.classList.add('chualam');
                    break;
            }
          container.innerHTML = `<p>Câu ${dem} ${text}</p>`;
          main.appendChild(container);
          ++dem;
          await timer(50);
        }
  }

  $('#chualam').click(() => {
      if($('#chualam').is(':checked')){
        for(var item of doc.getElementsByClassName('chualam'))
            item.classList.remove('d-none');
      } else {
        for(var item of doc.getElementsByClassName('chualam'))
            item.classList.add('d-none');
      }
  });
  $('#dung').click(() => {
    if($('#dung').is(':checked')){
        for(var item of doc.getElementsByClassName('dung'))
            item.classList.remove('d-none');
    } else {
        for(var item of doc.getElementsByClassName('dung'))
            item.classList.add('d-none');
    }
  });
  $('#sai').click(() => {
    if($('#sai').is(':checked')){
        for(var item of doc.getElementsByClassName('sai'))
            item.classList.remove('d-none');
    } else {
        for(var item of doc.getElementsByClassName('sai'))
            item.classList.add('d-none');
    }
  });
}
//=====================================================================

async function create_Mcau(contentTopics){
    var main = doc.querySelector('#main ol');
    for(var [index, contentTopic] of contentTopics.entries()){
      var cau = doc.createElement('li');
      setAttributes(cau, {id:`a${index+1}`, class:'Cau fw-bold fs-4'});
      var ques = doc.createElement('span');
      ques.innerHTML = contentTopic['Questions'][0]; 
  
      var ans = doc.createElement('ol');
      setAttributes(ans, {type: 'A', addClass: 'fw-normal fs-5'});
      var i = 0;
      try {
        while(true){
          var key = `mca_${i}`;
          var value = contentTopic['MCAs'][0]['MCA'][key];
          if(value == undefined) break;
          var tung_cau = doc.createElement('li');
          tung_cau.innerHTML = value;
          if(key == contentTopic['MCAs'][0]['Answer']) tung_cau.setAttribute('class','fw-bold bg-success');
          if(key == contentTopic['MCAs'][0]['answer'] && contentTopic['MCAs'][0]['Answer'] != contentTopic['MCAs'][0]['answer'])
                        tung_cau.setAttribute('class','fw-bold bg-danger');
          ans.appendChild(tung_cau);
          ++i;
        }
      } catch (error){}
      cau.appendChild(ques)
      cau.appendChild(ans);
      main.appendChild(cau);
      await timer(50);
    }
}
  
async function create_Mphan(contentTopics){
    counter = 0;
    var main = doc.querySelector('#main ol');
    for(var [index, contentTopic] of contentTopics.entries()){
        var CAUS = doc.createElement('ol');
        CAUS.setAttribute('class','Caus');
        var phan = doc.createElement('li');
        setAttributes(phan, {id:`c${index+1}`, class:'Phan fw-bold fs-4'});
        var nameTopic = doc.createElement('span');
        for(var name of contentTopic['nameTopic'])
            nameTopic.innerHTML += name + '<br>';

        phan.appendChild(nameTopic);
        phan.appendChild(CAUS);
        main.appendChild(phan);
        var ma = doc.querySelector(`#main #c${index+1} ol`);
        ma.style = `counter-reset: lis ${counter}`;
        for(var [index, Question] of contentTopic['Questions'].entries()){
            var cau = doc.createElement('li');
            setAttributes(cau, {id:`a${index+1}`, class:'Cau fw-bold fs-4'});
            var ques = doc.createElement('span');
            ques.innerHTML = Question + '<br>';

            var ans = doc.createElement('ol');
            setAttributes(ans, {type: 'A', addClass: 'fw-normal fs-5'});
            var i = 0;
            try {
                while(true){
                    var key = `mca_${i}`;
                    var value = contentTopic['MCAs'][index]['MCA'][key];
                    if(value == undefined) break;
                    var tung_cau = doc.createElement('li');
                    tung_cau.innerHTML = value;
                    if(key == contentTopic['MCAs'][index]['Answer']) tung_cau.setAttribute('class','fw-bold bg-success');
                    if(key == contentTopic['MCAs'][index]['answer'] && contentTopic['MCAs'][index]['Answer'] != contentTopic['MCAs'][index]['answer'])
                        tung_cau.setAttribute('class','fw-bold bg-danger');
                    ans.appendChild(tung_cau);
                    ++i;
                }
            } catch (error){}
            cau.appendChild(ques)
            cau.appendChild(ans);
            ma.appendChild(cau);
            ++counter;
            await timer(50);
        }
        await timer(50);
    }
}
  
async function printMix(isMulti, Topics){
    var CAUS = $('<ol/>').addClass('Caus');
    var PHANS = $('<ol/>').addClass('Phans');
    if(isMulti == 0){
      $('#main').append(CAUS);
      create_Mcau(Topics);
    } else {
      $('#main').append(PHANS);
      create_Mphan(Topics);
    }
}


















