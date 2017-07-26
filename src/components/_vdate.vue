<template>
    <div class="date">
        <span v-text="viewYear">--</span>
        <br>
        <label v-text="viewDate">--</label>
    </div>
</template>

<script>
let flag = false
export default {
    data() {
        return {
            viewYear:'',
            viewDate:'',
        }
    },
    props: ['date'],
    mounted(){
        // console.log(this.date)
        if(this.date){
            let ndates = this.date.split('-')
            // console.log(ndates)
            this.viewYear = ndates[0]
            this.viewDate = ndates[1] +'/'+ndates[2]
        }
    }

}
</script>