<template>
    <div class="about-us-page">
        <h1 class="page-title">关于我们</h1>
        <div class="team-members">
            <!-- 五位主创成员的个人信息 -->
            <div class="team-member">
                <div class="user-info">
                    <div class="user-avatar">
                        <img src="@/assets/images/membersyt.jpg" alt="成员1">
                    </div>
                    <div class="user-details">
                        <h2>成员1姓名</h2>
                        <p>职位: 职位1</p>
                        <p>专业-学院-班级-学号: 信息1</p>
                        <p>个人寄语: 寄语1</p>
                    </div>
                </div>
            </div>

            <div class="team-member">
                <div class="user-info">
                    <div class="user-avatar">
                        <img src="member2.jpg" alt="成员2">
                    </div>
                    <div class="user-details">
                        <h2>成员2姓名</h2>
                        <p>职位: 职位2</p>
                        <p>专业-学院-班级-学号: 信息2</p>
                        <p>个人寄语: 寄语2</p>
                    </div>
                </div>
            </div>

            <!-- 其他成员的类似结构 -->
        </div>
    </div>
</template>

<style scoped>
.about-us-page {
    text-align: center;
    padding: 20px;
}

.page-title {
    font-size: 24px;
    color: $letaoColor;
    /* 使用主色调 */
    margin-bottom: 20px;
}

.team-members {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.team-member {
    width: calc(50% - 10px);
    /* 计算占据一行的一半，考虑到间距 */
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.user-info {
    display: flex;
    align-items: center;
}

.user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
}

.user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-details {
    flex-grow: 1;
}

h2 {
    font-size: 18px;
    margin: 10px 0;
}

p {
    font-size: 14px;
    margin: 5px 0;
}
</style>
