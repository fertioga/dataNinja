
<template>
    <div class="container" data-bs-theme="dark">
        <!-- Button trigger modal -->
        <a href="#" data-bs-toggle="modal" data-bs-target="#examplesRegex">
            examples
        </a>
        
        <!-- Modal Examples-->
        <div class="modal fade" id="examplesRegex" tabindex="-1" aria-labelledby="examplesRegexLabel" aria-hidden="true" ref="myModal">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="examplesRegexLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h2>Regex Tokens</h2>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Token</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in this.rowsTableToken">
                                <td>{{ row.regex }}</td>
                                <td>{{ row.description }}</td>
                            </tr>                            
                        </tbody>
                    </table>

                    <p>Some examples of regex:</p>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">REGEX</th>
                            <th scope="col">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in this.rowsTableExample" style="cursor: pointer;" @click="send(row.regex)" :key="index">
                                <th scope="row">{{ row.regex }}</th>
                                <td>{{ row.description }}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalExamplesRegex',
    data() {
        return {
            rowsTableToken: [
                { regex: 'a', description: 'The character a' },
                { regex: 'abc', description: 'The string abc' },
                { regex: '[abc]', description: 'a, b, or c' },
                { regex: '[^abc]', description: 'Any character except a, b, or c' },
                { regex: '[a-z]', description: 'Any lowercase letter' },
                { regex: '[A-Z]', description: 'Any uppercase letter' },
                { regex: '[a-zA-Z]', description: 'Any letter' },
                { regex: '[0-9]', description: 'Any digit' },
                { regex: '[^0-9]', description: 'Any non-digit' },
                { regex: '\d', description: 'Any digit' },
                { regex: '\D', description: 'Any non-digit' },
                { regex: '\w', description: 'Any word character (letter, number, underscore)' },
                { regex: '\W', description: 'Any non-word character' },
                { regex: '...', description: 'Any three characters' },
                { regex: 'a|b', description: 'a or b' },
                { regex: 'a*', description: 'Zero or more of a' },
                { regex: 'a+', description: 'One or more of a' },
                { regex: 'a?', description: 'Zero or one of a' },
                { regex: 'a{3}', description: 'Exactly 3 of a' },
                { regex: 'a{3,}', description: '3 or more of a' },
                { regex: 'a{3,6}', description: 'Between 3 and 6 of a' },
                { regex: '^', description: 'Start of string' },
                { regex: '$', description: 'End of string' },
                { regex: '\b', description: 'A word boundary' },
                { regex: '\B', description: 'Non-word boundary' },
            ],
            rowsTableExample: [
                { regex: '/^\d2\d2 \d{4,5}-\d{4}$/', description: 'Phone numbers in the format (XX) XXXX-XXXX or (XX) X XXXX-XXXX.' },
                { regex: '/^\d{3}.\d{3}.\d{3}-\d{2}$/',description: 'CPF numbers in the format XXX.XXX.XXX-XX.' },
                { regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/',description: 'Email addresses.' },
                { regex: '/^\d+$/', description: 'String containing only digits.' },
                { regex: '/^[a-zA-Z]+$/', description: 'String containing only letters (uppercase or lowercase)..' }
            ],
        };
    }
};
</script>
