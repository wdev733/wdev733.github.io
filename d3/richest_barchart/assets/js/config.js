const config = {

  // set the maximum numbers of bars
  max_number: 20,

  // auto sort or not
  auto_sort: true,

  // set timeformat
  timeFormat: "%Y",

  // ASC / Desc
  reverse: false,

  // set the column name to sort
  divide_by: "name",
     
  //interval time of animation
  interval_time: 2,
  pauseDuration: 1000, // 1 sec pause
  // .2f mains keep two decimals.
  format: ",",

  // label of postfix.
  postfix: " billion",

  // set the spacing of svg
  left_margin: 280,
  right_margin: 350,
  top_margin: 80,
  bottom_margin: 40,

  // change date label and its position.
  dateLabel_switch: true,  
  dateLabel_x: null,
  dateLabel_y: null,

  // allow bars to exit to top
  allow_up: false,

  // set the initial animation to start from 0 or middle. (bar size increases from 0 or half)
  enter_from_0: false,

  // change the domain of x when values are too big
  big_value: false,

  // set the second of wait.
  wait: 0,

  // set the animation duration
  update_rate: 1,
   
  // show label
  showLabel: true,

  // position of y axis tick text
  labelx: -10,
 
  // set background color of svg.
  background_color: "#FDF2E8",
  
  // show x axis ticks
  show_x_tick: true,
  
  // limit bar info display length
  bar_name_max: 60,

  display_inside_the_bar: '', //possible values: 1.name 2.type

  display_left_of_the_bar: 'type', //possible values: 1.name 2.type 3.rank

  bar_height: 43, //set bar heights
 
  //set date label attributes on bottom 
  date_label: {
    font_size: 60, 
    x: 280, // positive values -> date goes right, negative values -> date goes left
    y: 0  // positive values -> date goes down, negative values -> date goes up
  },

  player_rank_point_size: 24, //set font size at the right of bar

  blur_background_image: true, // set it false if you do not want blurry effect

  animate_background_image: true // background image moving slowly (affects performance)
};