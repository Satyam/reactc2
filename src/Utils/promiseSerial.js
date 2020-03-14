const promiseSerial = promises =>
  promises.reduce(
    (output, promise) =>
      output.then(result =>
        Promise.resolve(promise).then(Array.prototype.concat.bind(result))
      ),
    Promise.resolve([])
  );

export default promiseSerial;
