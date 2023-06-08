const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchdata = async searchText => {
    const res =  await fetch('../data/data.json');
    const data = await res.json();

    let matches = data.filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return data.studentFirstName.match(regex) || data.studentId.match(regex);
    });

    if(searchText.length === 0 ){
        matches = [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);

};
const outputHtml = matches => {
    if(matches.length > 0 ){
const html = matches.map(match => `
        <div class="card card-body mb-1">
        <h4>${match.studentFirstName} ${match.studentLastName} (${match.studentId}) <span class="text-primary"></sapn></h4>
        <small>สาขา: ${match.studyField}  </small><br>
        <small>ประเภทคำร้อง: ${match.form}  รายวิชา: ${match.subjectCode} </small><br> 
        <small><b>สถานะ:</b> ${match.status}</small> 
        
        </div>
`

)
.join('');
matchList.innerHTML = html;
    }
};
search.addEventListener('input', () => searchdata(search.value));