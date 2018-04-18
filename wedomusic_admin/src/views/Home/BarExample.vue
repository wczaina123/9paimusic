<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['老生复报', '今日新生', '新增会员',],
      datasets: [
        {
          label: '明细',
          backgroundColor: ['#ACADFF','#67BFFF','#FDD551'],
          data: [3,4,5]
        }
      ]
    })
  }
}
</script>
