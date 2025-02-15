这是老库表数据结构：
CREATE TABLE `order`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `out_trade_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `picture_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `total_fee` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('pending','paid','closed','refunding','refunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending' COMMENT '订单状态：pending-待支付，paid-已支付，closed-已关闭，refunding-退款中，refunded-已退款',
  `transaction_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `expire_time` timestamp(0) NULL DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

这是老库表的数据：
INSERT INTO `order` VALUES ('094678ff-08f9-4f14-95a7-b7d83ec2f01c', '1739175900830c9ba0624', 'b2d37070-95c6-4208-91a8-7c4e7532ee0b', '2f67ef01-123f-438b-b389-fc58671818d5', '10', 'paid', NULL, '2025-02-10 18:25:01', '2025-02-10 16:25:00.831077', '2025-02-10 16:25:12.561000', 0);
INSERT INTO `order` VALUES ('30a53876-e8da-4fb1-a75c-1d16decc1657', '17392005592548dc7ae01', 'b458765b-84dd-4532-9491-8467f7f0b757', 'fa3eadd4-cc0d-4a7c-ac97-81f29c229ad9', '10', 'paid', NULL, '2025-02-11 01:15:59', '2025-02-10 23:15:59.255018', '2025-02-10 23:16:04.720000', 0);
INSERT INTO `order` VALUES ('3229482b-57e3-4192-ba46-f8773602fb48', '1739183970779b6cdd2a7', '4179b0fc-74e5-402d-be5f-dcd3a0f5273e', '04ca7c19-df34-4c15-9629-b699eae8e3eb', '10', 'paid', NULL, '2025-02-10 20:39:31', '2025-02-10 18:39:30.780861', '2025-02-10 18:39:36.398000', 0);
INSERT INTO `order` VALUES ('58a87300-3d5f-422a-b9cb-06b76d5a51fb', '1739276951736bbaf4c2d', '6e3e529a-edea-46c4-8c97-cf6149b5f43e', '2ca50ddb-07ba-4e45-8746-29fbe6e3db84', '10', 'paid', NULL, '2025-02-11 22:29:12', '2025-02-11 20:29:11.737021', '2025-02-11 20:29:20.430000', 0);
INSERT INTO `order` VALUES ('71adbaea-77e4-48d0-a4b8-b07f9f1c0f29', '173917561777525907ce9', 'd77f9da1-8937-4167-950e-97d378d81792', '092e491a-bf99-4275-b42a-1d6f2c5b8e34', '10', 'paid', NULL, '2025-02-10 18:20:18', '2025-02-10 16:20:17.776507', '2025-02-10 16:20:45.933000', 0);
INSERT INTO `order` VALUES ('83fc68c8-f372-4a01-bbea-0b79466ddb33', '173924068719387ecc0de', '205f7b0b-7ec4-4062-b93a-2cd771b3737c', '11bcfc1c-e18a-4120-b44c-c23c0cb9342f', '10', 'paid', NULL, '2025-02-11 12:24:47', '2025-02-11 10:24:47.194184', '2025-02-11 10:24:54.936000', 0);
INSERT INTO `order` VALUES ('aeb75c5e-d922-445b-8b86-d5252e482d3b', '1739241744085d88a2f49', 'c27440cb-24ca-497c-acbd-8de42dcc9976', '11bcfc1c-e18a-4120-b44c-c23c0cb9342f', '10', 'paid', NULL, '2025-02-11 12:42:24', '2025-02-11 10:42:24.085725', '2025-02-11 10:42:30.937000', 0);
INSERT INTO `order` VALUES ('b181b9f3-8915-4937-9d32-33bb9dadddb5', '173927751875228b81f9e', '784c0d37-1452-4ca5-b115-91742830c222', '2ca50ddb-07ba-4e45-8746-29fbe6e3db84', '10', 'paid', NULL, '2025-02-11 22:38:39', '2025-02-11 20:38:38.752781', '2025-02-11 20:38:44.673000', 0);
INSERT INTO `order` VALUES ('c252ecaa-c6bb-4151-8a09-092892903fd9', '173919862796738cf213f', '853bce81-0553-4296-959f-b7802b40df71', 'ee9adad8-cf6c-48a7-83c4-d72f38a5e362', '10', 'paid', NULL, '2025-02-11 00:43:48', '2025-02-10 22:43:47.968137', '2025-02-10 22:44:06.486000', 0);
INSERT INTO `order` VALUES ('e5243195-590d-49d4-9971-a9955f7ac929', '173917696289360df0999', '62b0936e-45ac-4b25-b6ce-aedcbf2a6b2b', 'd1a2c913-2f30-4324-9fcb-65f517a916d7', '10', 'paid', NULL, '2025-02-10 18:42:43', '2025-02-10 16:42:42.894011', '2025-02-10 16:42:49.822000', 0);
INSERT INTO `order` VALUES ('e82a71d5-3a99-4921-8dfc-995d6c18e7b5', '1739195659556e9429534', '477aaa41-3e8f-40e4-a22c-d9af66cbcff4', '2ca50ddb-07ba-4e45-8746-29fbe6e3db84', '10', 'paid', NULL, '2025-02-10 23:54:20', '2025-02-10 21:54:19.556849', '2025-02-10 21:54:25.489000', 0);


这是新库表的示例insert语句：
INSERT INTO `milk_candy_album`.`order`(`out_trade_no`, `picture_id`, `user_id`, `total_fee`, `status`, `expire_time`, `created_at`, `updated_at`, `is_deleted`, `id`, `transaction_id`) VALUES ('17396209092468f645a6c', '1890722724205170688', '1890719369177206784', '1', 'refunding', '2025-02-15 22:01:49', '2025-02-15 20:01:49.251434', '2025-02-15 20:26:13.000000', 0, '1890733248598904832', NULL);

要求根据老数据按照新库表的格式，生成新库表的insert语句，老库表的snow_id替换新库表的id位置，user_id统一为：1890743605027540992，picture_id统一为1888108602581979136,id自行生成雪花id。
