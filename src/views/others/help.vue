<template>
    <div class="help-center">
        <header class="header">
            <h1>帮助中心</h1>
        </header>

        <div class="categories">
            <div class="category">
                <h2>常见问题</h2>
                <ul>
                    <li>
                        <h3>如何注册账户？</h3>
                        <p>您可以在首页点击“注册”按钮，然后填写必要的信息来创建一个账户。</p>
                    </li>
                    <li>
                        <h3>如何联系客服？</h3>
                        <p> 在工作时间，点击联系客服按钮， 我们将在15分钟内应答。</p>
                    </li>
                    <li>
                        <h3>如何联系客服？</h3>
                        <p>您可以通过我们的客服热线 156-4088-5580 或发送电子邮件至 support@example.com 与我们联系。</p>
                    </li>
                </ul>
            </div>

            <!-- 其他类别的问题和答案 -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.help-center {
    background-color: #f7f7f7;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.header {
    background-color: $letaoColor;
    color: #fff;
    text-align: center;
    padding: 20px 0;
}

.header h1 {
    font-size: 32px;
    font-weight: bold;
}

.categories {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.category {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 100%;
}

.category h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 20px;
}

h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    line-height: 1.5;
}
</style>
