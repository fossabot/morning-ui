<template>
    <mor-load
        :_uiid="uiid"
        :class="[sizeClass]"

        :time="time"
        :note="note"
    >

    <template v-if="data.loaded">
        <template v-if="data.fail">
            <morning-center class="fill loadfail"><i class="morningicon">&#xe6ac; </i>&nbsp;加载失败</morning-center>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </template>
    <template v-else>
        <morning-center class="fill"><p class="loading"><i class="morningicon">&#xe703;</i><br/>{{conf.note}}</p></morning-center>
    </template>
        
    </mor-load>
</template>
 
<script>
const defaultTime = 200;

export default {
    origin : 'UI',
    name : 'load',
    props : {
        time : {
            type : [Boolean, Number],
            default : defaultTime
        },
        note : {
            type : String,
            default : ''
        }
    },
    computed : {
        _conf : function () {

            return {
                time : this.time,
                note : this.note
            };

        }
    },
    data : function () {

        return {
            data : {
                loading : false,
                loaded : false,
                fail : false,
                loadPromise : null,
                loadResolve : null,
                loadReject : null
            }
        };

    },
    methods : {
        resolve : function () {

            this.loadResolve();

            return this;

        },
        reject : function () {

            this.loadReject();

            return this;

        },
        reload : function () {

            if (this.data.loading) {

                return this;

            }

            this.data.loading = true;
            this.data.loaded = false;
            this.data.fail = false;

            this.loadPromise = new Promise((resolve, reject) => {

                this.loadResolve = resolve;
                this.loadReject = reject;

            });

            this.loadPromise
                .then(() => {

                    this.data.loading = false;
                    this.data.loaded = true;

                }, () => {

                    this.data.loading = false;
                    this.data.fail = true;
                    this.data.loaded = true;

                });

            if (this.conf.time) {

                setTimeout(() => {

                    this.data.loading = false;
                    this.data.loaded = true;

                }, this.conf.time);

            }

            return this;

        }
    },
    created : function () {},
    mounted : function () {

        this.$watch('data.loaded', () => {

            this.$emit('emit');

            if (this.data.fail) {

                this.$emit('fail');

            } else {

                this.$emit('done');

            }

        });

        this.reload();

    }
};
</script>

<style lang="less" src="./index.less"></style>
