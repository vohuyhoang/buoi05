const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', './views');

let courses = [
  { id: 1, name: 'Điện thoại iPhone 14 Pro Max 128GB', hinh: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-vang-thumb-200x200.jpg', gia: 29490000 },
  { id: 2, name: 'iPhone 14 Pro', hinh: 'https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-200x200.jpg', gia: 10001 },
  { id: 3, name: 'Điện thoại iPhone 14 Pro Max 128GB', hinh: 'https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1-200x200.jpg', gia: 29490000 },
  { id: 4, name: 'Điện thoại iPhone 14 Pro Max 128GB', hinh: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-vang-thumb-200x200.jpg', gia: 29490000 },
  { id: 5, name: 'iPhone 14 Pro', hinh: 'https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-200x200.jpg', gia: 10001 },
  { id: 6, name: 'Điện thoại iPhone 14 Pro Max 128GB', hinh: 'https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1-200x200.jpg', gia: 29490000 },
  { id: 7, name: 'Điện thoại iPhone 14 Pro Max 128GB', hinh: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-vang-thumb-200x200.jpg', gia: 29490000 },
  { id: 8, name: 'iPhone 14 Pro', hinh: 'https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-200x200.jpg', gia: 10001 },
  { id: 9, name: 'Điện thoại iPhone 14 Pro Max 128GB', hinh: 'https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1-200x200.jpg', gia: 29490000 },
  { id: 10, name: 'Điện thoại iPhone 14 Pro Max 128GB', hinh: 'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-vang-thumb-200x200.jpg', gia: 29490000 },
  { id: 11, name: 'iPhone 14 Pro', hinh: 'https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-tim-thumb-200x200.jpg', gia: 10001 },
  { id: 12, name: 'Điện thoại iPhone 14 Pro Max 128GB', hinh: 'https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-1-200x200.jpg', gia: 29490000 },
]
const ITEMS_PER_PAGE = 2;
// hien thi danh sach

app.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const coursesArray = courses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const newCourse = null;
  res.render('index', { courses: coursesArray, newCourse, totalPages, currentPage: page });
});


//them
app.post('/courses/add', (req, res) => {
  const name = req.body.name;
  const hinh = req.body.hinh;
  const gia = req.body.gia;
  const course = {
    id: courses.length + 1,
    name: name,
    hinh: hinh,
    gia: gia

  };
  courses.push(course);

  const encodedCourses = encodeURIComponent(JSON.stringify(courses));
  res.redirect(`/?courses=${encodedCourses}&newCourse=${encodeURIComponent(JSON.stringify(course))}`);
});


app.get('/courses/add', (req, res) => {
  res.render('add-course');
});

//xoa
app.post('/courses/delete/:id', (req, res) => {
  let id = req.params.id;
  courses = courses.filter(course => course.id !== parseInt(id));
  res.redirect('/');
});


//sua
app.post('/courses/edit/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const hinh = req.body.hinh;
  const gia = req.body.gia;
  const course = courses.find(course => course.id === parseInt(id));

  course.name = name;
  course.hinh = hinh;
  course.gia = gia;
  res.redirect('/');
});


app.get('/courses/edit/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(course => course.id === courseId);

  res.render('edit-course', { course });
});


const PORT = process.env.PORT || 3000;


const path = require('path');
const { url } = require('inspector');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.listen(PORT, () => console.log(`server running on port ${PORT}`));
