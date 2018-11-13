<template>

    <section class="section">
        <div class="container">
            <h1 class="title has-text-centered">About us</h1>
            <!-- form -->
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" placeholder="Nama lengkap">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <div class="control">
                            <input type="email" class="input" placeholder="Email">
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">

                    <div class="field">
                        <div class="control">
                            <textarea class="textarea" placeholder="Your text"></textarea>
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
                
            <!-- end form -->
        </div>
    </section>
</template>


<script>
export default {
    layout : 'app'
}
</script>
