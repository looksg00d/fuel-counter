#[tokio::test]
async fn can_get_contract_id() {
    let (instance, _id) = get_contract_instance().await;

    // Increment the counter
    instance.methods().increment().call().await.unwrap();

    // Get the current value of the counter
    let result = instance.methods().count().call().await.unwrap();

    // Check that the current value of the counter is 1.
    // Recall that the initial value of the counter was 0.
    assert_eq!(result.value, 1);
}
