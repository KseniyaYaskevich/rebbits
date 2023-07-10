const container = document.querySelector('.square-body');
const blocks = document.querySelectorAll('.block');
const resetButton = document.querySelector('.btn-reset');

let countBlocks;

const getCardsCount = () => {
    const rowWidth = container.clientWidth - 6 * 2;
    const blockWidth = document.querySelector('.block').clientWidth + 2;
    countBlocks = Math.floor(rowWidth / blockWidth);

    return countBlocks;
}

const moveSquare = (evt) => {
    const updatedBlocks = document.querySelectorAll('.block');

    const currentBlock = evt.target.closest('.block')
    const previousBlock = currentBlock.previousElementSibling;
    const nextBlock = currentBlock.nextElementSibling;

    if (evt.target.closest('.left')) {
        if (previousBlock) {
            previousBlock.before(currentBlock);
        }
    }

    if (evt.target.closest('.right')) {
        if (nextBlock) {
            nextBlock.after(currentBlock);
        }
    }

    if (evt.target.closest('.top')) {
        for (let i = 0; i < updatedBlocks.length; i++) {
            if (currentBlock === updatedBlocks[i]) {
                const topBlock = updatedBlocks[i - countBlocks];

                if (topBlock) {
                    if (window.matchMedia('(max-width: 348px)').matches) {
                        previousBlock.before(currentBlock);
                    } else {
                        topBlock.replaceWith(currentBlock);
                        previousBlock.after(topBlock);
                    }
                }
            }
        }
    }

    if (evt.target.closest('.bottom')) {
        for (let i = 0; i < updatedBlocks.length; i++) {
            if (currentBlock === updatedBlocks[i]) {
                const bottomBlock = updatedBlocks[i + countBlocks];

                if (bottomBlock) {
                    if (window.matchMedia('(max-width: 348px)').matches) {
                        nextBlock.after(currentBlock)
                    } else {
                        bottomBlock.replaceWith(currentBlock);
                        nextBlock.before(bottomBlock);
                    }
                }
            }
        }
    }
};

const reset = () => {
    container.innerHTML = '';

    blocks.forEach((block) =>
        container.append(block)
    );
};

window.addEventListener('resize', getCardsCount);
container.addEventListener('click', moveSquare);
resetButton.addEventListener('click', reset);

getCardsCount();
