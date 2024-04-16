
<template>
    <div>
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
                            <tr>
                                <td>[abc]</td>
                                <td>A single character of: a, b or c</td>
                            </tr>
                            <tr>
                                <td>[^abc]</td>
                                <td>A character except: a, b or c</td>
                            </tr>
                            <tr>
                                <td>[a-z]</td>
                                <td>A character in the range: a-z</td>
                            </tr>
                            <tr>
                                <td>[^a-z]</td>
                                <td>A character not in the range: a-z</td>
                            </tr>
                            <tr>
                                <td>[a-zA-Z]</td>
                                <td>A character in the range: a-z or A-Z</td>
                            </tr>
                            <tr>
                                <td>.</td>
                                <td>Any single character</td>
                            </tr>
                            <tr>
                                <td>a|b</td>
                                <td>Alternate - match either a or b</td>
                            </tr>
                            <tr>
                                <td>\s</td>
                                <td>Any whitespace character</td>
                            </tr>
                            <tr>
                                <td>\S</td>
                                <td>Any non-whitespace character</td>
                            </tr>
                            <tr>
                                <td>\d</td>
                                <td>Any digit</td>
                            </tr>
                            <tr>
                                <td>\D</td>
                                <td>Any non-digit</td>
                            </tr>
                            <tr>
                                <td>\w</td>
                                <td>Any word character</td>
                            </tr>
                            <tr>
                                <td>\W</td>
                                <td>Any non-word character</td>
                            </tr>
                            <tr>
                                <td>(?:...)</td>
                                <td>Match everything enclosed</td>
                            </tr>
                            <tr>
                                <td>(...)</td>
                                <td>Capture everything enclosed</td>
                            </tr>
                            <tr>
                                <td>a?</td>
                                <td>Zero or one of a</td>
                            </tr>
                            <tr>
                                <td>a*</td>
                                <td>Zero or more of a</td>
                            </tr>
                            <tr>
                                <td>a+</td>
                                <td>One or more of a</td>
                            </tr>
                            <tr>
                                <td>a{3}</td>
                                <td>Exactly 3 of a</td>
                            </tr>
                            <tr>
                                <td>a{3,}</td>
                                <td>3 or more of a</td>
                            </tr>
                            <tr>
                                <td>a{3,6}</td>
                                <td>Between 3 and 6 of a</td>
                            </tr>
                            <tr>
                                <td>^</td>
                                <td>Start of string</td>
                            </tr>
                            <tr>
                                <td>$</td>
                                <td>End of string</td>
                            </tr>
                            <tr>
                                <td>\b</td>
                                <td>A word boundary</td>
                            </tr>
                            <tr>
                                <td>\B</td>
                                <td>Non-word boundary</td>
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
                        <tr v-for="(row, index) in this.rowsTable" style="cursor: pointer;" @click="send(row.regex)" :key="index">
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
            rowsTable: [
                {
                    regex: '/^\d2\d2 \d{4,5}-\d{4}$/',
                    description: 'Phone numbers in the format (XX) XXXX-XXXX or (XX) X XXXX-XXXX.'
                },
                {
                    regex: '/^\d{3}.\d{3}.\d{3}-\d{2}$/',
                    description: 'CPF numbers in the format XXX.XXX.XXX-XX.'
                },
                {
                    regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/',
                    description: 'Email addresses.'
                },
                {
                    regex: '/^\d+$/',
                    description: 'String containing only digits.'
                },
                {
                    regex: '/^[a-zA-Z]+$/',
                    description: 'String containing only letters (uppercase or lowercase)..'
                }
            ],
        };
    }
};
</script>
