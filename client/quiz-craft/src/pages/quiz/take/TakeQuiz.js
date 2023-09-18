const TakeQuiz = () =>{

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // sendRequest();
    };

    return (
        <div className="w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form onSubmit={handleSubmit}>
                <div className="pb-5">
                    <h5 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">1. A backup drive was created using dd to make a bit-for-bit copy. When the drive is inserted into an iSCSI target before it is booted up, the data appears to be missing. What happened?</h5>
                    <ul class="grid w-full gap-3 md:grid-cols-1">
                        <li>
                            <input type="radio" id="a1-1" name="a1" value="a1-1" class="hidden peer" required/>
                            <label for="a1-1" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-sm">The backup drive is corrupted and needs to be re-created.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="a1-2" name="a1" value="a1-2" class="hidden peer" required/>
                            <label for="a1-2" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-sm">When the backup drive was duplicates, the label was as well. When booted, the system mounted the old duplicates drive by its identical label.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="a1-3" name="a1" value="a1-3" class="hidden peer" required/>
                            <label for="a1-3" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-sm">There is a conflict between the physical location of the backup drive and the original drive.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="a1-4" name="a1" value="a1-4" class="hidden peer" required/>
                            <label for="a1-4" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-sm">The backup process went wrong, and the old drive was duplicates over the original drive.</div>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="pb-5">
                    <h5 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">1. A backup drive was created using dd to make a bit-for-bit copy. When the drive is inserted into an iSCSI target before it is booted up, the data appears to be missing. What happened?</h5>
                    <ul class="grid w-full gap-3 md:grid-cols-1">
                        <li>
                            <input type="radio" id="a1-1" name="a1" value="a1-1" class="hidden peer" required/>
                            <label for="a1-1" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-sm">The backup drive is corrupted and needs to be re-created.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="a1-2" name="a1" value="a1-2" class="hidden peer" required/>
                            <label for="a1-2" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-sm">When the backup drive was duplicates, the label was as well. When booted, the system mounted the old duplicates drive by its identical label.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="a1-3" name="a1" value="a1-3" class="hidden peer" required/>
                            <label for="a1-3" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-sm">There is a conflict between the physical location of the backup drive and the original drive.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="a1-4" name="a1" value="a1-4" class="hidden peer" required/>
                            <label for="a1-4" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <div class="w-full text-sm">The backup process went wrong, and the old drive was duplicates over the original drive.</div>
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default TakeQuiz;