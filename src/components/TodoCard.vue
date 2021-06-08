<template>
    <div>
        {{ complete }}
        {{ title }}
        {{ duration }}
    </div>
</template>

<script>
    export default {
        props:{
            parent: Number,
            title: String,
            complete: Boolean,
            description: String,
            duration: Number
        }
    }
</script>
