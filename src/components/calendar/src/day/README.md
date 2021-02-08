# template
> - type: Array

---

# options
> - type: Object
> - child:
  ## headerTop: Number
  > - default: 0
  > - 控制 DayScheduleHeader 定位的 top 位置

  ## headerHeight: Number
  > - default: 96
  > - 控制 DayScheduleHeader 的高度

  ## todayColor: String 
  > - default: #eb8d48
  > - 控制 DayScheduleHeader 右側顯示日期偵測到日期為今天的提示顏色

  ## weekdayFormatter: Array
  > - default: ['週日', '週ㄧ', '週二', '週三', '週四', '週五', '週六']
  > - 控制 DayScheduleHeader 右側顯示日期的

  ## headerDateFormat: String
  > - default: M/D
  > - 控制 DayScheduleHeader 右側顯示日期顯示的格式